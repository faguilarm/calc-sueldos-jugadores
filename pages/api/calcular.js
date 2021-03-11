import { calcularSueldos } from "../../utils/calculadora";

export default (req, res) => {
  try {
    res.status(200).json(calcularSueldos(req.body));
  } catch (error) {
    res.status(500).send(error);
  }
}
