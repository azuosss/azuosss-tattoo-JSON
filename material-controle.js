const MaterialsDao = require('./MaterialsDao');
const Materials = require('./material');

module.exports = (app, db) => {
  let materialsDb = new MaterialsDao(db)

  app.get('/materials', async (req, res) => {
    try {
      const rows = await materialsDb.getAllMaterials();
      res.json({
        result: rows,
        count: rows.length
      })
    } catch (err) {
      res.json({err});
    }
  });

  app.post('/materials', async (req, res) => {
      const {nome, marca, precoEntrada, quantidade} = req.body;
      let newMaterial = new Materials(nome, marca, precoEntrada, quantidade)
      try { 
        await materialsDb.postMaterials(newMaterial)
        res.status(201).json({
          message: "Materials successfully inserted.",
      })
  }
  catch{
      res.status(500).json({
          message: "Error inserting materials.",
          serverLog: err.message,
          error: true
      })
  }
})

  app.delete('/materials/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await materialsDb.deleteMaterials(id);
      res.status(200).json({
        message: `Materials with id ${id} deleted successfully.`,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting materials",
        serverLog: err.message,
        error: true,
      });
    }
  });

  app.put('/materials/:id', async (req, res) => {
    const {nome, marca, precoEntrada, quantidade} = req.body;
    const { id } = req.params;
    try {
      await materialsDb.putMaterials(id, nome, marca, precoEntrada, quantidade);
      res.status(200).json({
        message: `Materials with id ${id} successfully update.`,
        error: false,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error updating materials",
        serverLog: err.message,
        error: true,
      });
    }
  });
};