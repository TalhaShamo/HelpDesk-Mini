const processedKeys = new Map();

const idempotency = (req, res, next) => {
  if (req.method !== 'POST') {
    return next();
  }

  const idempotencyKey = req.get('Idempotency-Key');

  // If there's no key, just proceed as normal
  if (!idempotencyKey) {
    return next();
  }

  // Check if we've already processed this key
  if (processedKeys.has(idempotencyKey)) {
    console.log(`Idempotency: Returning stored response for key ${idempotencyKey}`);
    const storedResponse = processedKeys.get(idempotencyKey);
    // Return the stored status code and body
    return res.status(storedResponse.statusCode).json(storedResponse.body);
  }

  // If we haven't seen this key, we need to process the request but also store the response when it's sent.
  const originalJson = res.json;

  res.json = (body) => {
    // Store the response before sending it
    const responseToStore = {
      statusCode: res.statusCode,
      body: body,
    };
    processedKeys.set(idempotencyKey, responseToStore);
    console.log(`Idempotency: Storing response for key ${idempotencyKey}`);

    // Set a timeout to clear the key after a while (e.g., 24 hours)
    setTimeout(() => {
      processedKeys.delete(idempotencyKey);
    }, 24 * 60 * 60 * 1000); // 24 hours

    // Call the original res.json to send the response to the client
    return originalJson.call(res, body);
  };

  next();
};

module.exports = { idempotency };