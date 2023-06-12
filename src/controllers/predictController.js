const tf = require("@tensorflow/tfjs");

const PredictDisease = async (req, res) => {
  try {
    const {
      cough,
      headache,
      blackhead,
      stomach_pain,
      itching,
      skin_rash,
      blown,
      continous_sneezing,
    } = req.body;

    if (
      !cough ||
      !headache ||
      !blackhead ||
      !stomach_pain ||
      !itching ||
      !skin_rash ||
      !blown ||
      !continous_sneezing
    ) {
      return res.status(400).json({
        message:
          "Missing Input Parameter, please fill all the required fields (cough,headache,blackhead,stomach_pain,itching,skin_rash,blown,continous_sneezing,), the value is either 0 or 1",
      });
    }
    const MODEL_PATH =
      "https://storage.googleapis.com/api-tes-388313.appspot.com/model/my_model.json";
    const model = await tf.loadLayersModel(MODEL_PATH);
    const input = tf.tensor2d(
      [
        parseInt(cough),
        parseInt(headache),
        parseInt(blackhead),
        parseInt(stomach_pain),
        parseInt(itching),
        parseInt(skin_rash),
        parseInt(blown),
        parseInt(continous_sneezing),
      ],
      [1, 8]
    );
    const prediction = model.predict(input);
    const pIndex = tf.argMax(prediction, (axis = 1)).dataSync();
    const classNames = [
      "Acne",
      "Allergy",
      "Angina",
      "Asthma",
      "Cold & Flu",
      "Flu",
      "Maag",
      "Migrain",
      "Not Found",
      "Pneumonia",
    ];
    res.status(200).json({
      message: "Prediction Success",
      disease_prediction: classNames[pIndex],
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
    console.log(error);
  }
};

const LoadModel = async (req, res) => {
  try {
    const MODEL_PATH =
      "https://storage.googleapis.com/api-tes-388313.appspot.com/model/my_model.json";
    const model = await tf.loadLayersModel(MODEL_PATH);
    res.status(200).json({
      message: "Model Loaded",
      model_status: "success open model.json",
      data: model,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
    console.log(error);
  }
};

module.exports = { PredictDisease, LoadModel };
