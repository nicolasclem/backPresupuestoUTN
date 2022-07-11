const db = require("../../database/models");


const operations = {




  show2: async (req, res) => {
    await  db.Operation.findAll({
      include: [{ association: "types" }, { association: "users" }],
      where: {id_user: req.params.id}
    } )
      .then((operations) => {
        return res.status(200).json({
          data: operations,
          status: 200,
        });
      })
      .catch((error) => console.log(error));
  },

  show: async (req, res) => {
    await db.Operation.findAll({
      include: [{ association: "types" }, { association: "users" }],
    })
      .then((operations) => {
        return res.status(200).json({
          data: operations,
          status: 200,
        });
      })
      .catch((error) => console.log(error));
  },

  edit: async (req, res) => {
    try {
      await db.Operation.update(
        {
          description: req.body.description,
          date: req.body.date,
          amount: req.body.amount,
          id_type: req.body.type,
        },
        {
          where: {
            id: parseInt(req.params.id),
          },
        }
      );
      return res.status(200).json({
        msg: "ok",
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    
    await db.Operation.create(
      {
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        id_type: req.body.type,
        id_user:  req.body.id,
      },
      {
        include: [
          {
            association: "types",
          },
          {
            association: "users",
          },
        ],
      }
    )
      .then(() => {
        res.send("creado");
      })
      .catch((e) => console.log(e));
  },
  del: async (req, res) => {
    db.Operation.destroy({
      include: [{ association: "types" }, { association: "users" }],
      where: { id: req.params.id },
    })
      .then(() => res.send("eliminado"))
      .catch((error) => console.log(error));
  },
};

module.exports = operations;
