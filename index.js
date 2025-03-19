const express = require('express');
const path = require('path');
const Datastore = require('nedb-promises');
const app = express();
const port = 3000;

const db = Datastore.create({ filename: 'hits.db', autoload: true });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/hits/:pageID', async (req, res) => {
  const pageID = req.params.pageID;

  try {
    let page = await db.findOne({ pageID });
    if (!page) {
      page = { pageID, hits: 1 };
      await db.insert(page);
    } else {
      page.hits += 1;
      await db.update({ pageID }, { $set: { hits: page.hits } });
    }
    res.json({ hits: page.hits });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});