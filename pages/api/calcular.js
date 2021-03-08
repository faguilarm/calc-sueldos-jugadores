import { calcularSueldos } from "../../utils/calculadora";

export default (req, res) => {
  res.status(200).json(calcularSueldos(req.body));
}
