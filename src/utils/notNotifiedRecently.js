module.exports = async (db, key) => {
  const lastCheck = await db.get(key);
  const timeAgo = Date.now() - Number(lastCheck);
  await db.set(key, Date.now());
  return timeAgo > 120000;
};
