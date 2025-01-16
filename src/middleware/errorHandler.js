export const errorHandler = (err, req, res, next) => {
  
  console.error('Error:', err.status || 500, err.message || 'Internal server error');
  if (err.response) {
    const status = err.response.status || 500;
    const message = err.response.data?.message || 'Internal server error';

    if (status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    if (status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    return res.status(status).json({ error: message });
  }
  res.status(500).json({ error: err.message || 'Internal server error' });
};