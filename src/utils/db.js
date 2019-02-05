class Db {
  constructor(sdb, tableName, env) {
    this.sdb = sdb;
    this.domain = tableName;
    this.env = env;
  }

  get(key) {
    if (!this.sdb) return Promise.resolve(Date.now() - 190000);
    return new Promise((fulfill, reject) => {
      this.sdb.getAttributes(
        {
          DomainName: this.domain,
          ItemName: this.env,
        },
        (err, data) => {
          if (err) {
            reject(`Error: ${err.toString()}`);
            return;
          }
          if (!data || !data.Attributes) {
            reject(`Error: entry ${this.env} not found.`);
            return;
          }
          const res = data.Attributes.find(aPair => aPair.Name === key);
          fulfill(res ? res.Value : '0');
        },
      );
    });
  }

  set(key, val) {
    if (!this.sdb) return Promise.resolve();
    return new Promise((fulfill, reject) => {
      this.sdb.putAttributes(
        {
          DomainName: this.domain,
          ItemName: this.env,
          Attributes: [
            {
              Name: key,
              Replace: true,
              Value: val.toString(),
            },
          ],
        },
        (err, data) => {
          if (err) {
            reject(`Error: ${err.toString}`);
            return;
          }
          fulfill(data);
        },
      );
    });
  }
}

module.exports = Db;
