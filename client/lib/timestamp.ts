const timestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default timestamp;
