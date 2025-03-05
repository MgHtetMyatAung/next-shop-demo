import api from "../axios";

export async function getProductCollections() {
  const res = await api.get("/product/collection");
  return res.data.collections;
}
