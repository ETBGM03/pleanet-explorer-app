import { API_URL } from "@constants";
import { Planet, PlanetsResponse } from "@types";
import { transformPlanetData } from "@adapters";
import { axiosInstance } from "@/constants/api";

export const planetsService = {
  async getAll(): Promise<Partial<Planet>[]> {
    const response = await axiosInstance.get<PlanetsResponse>(
      `${API_URL}/bodies`,
      { params: { filter: ["isPlanet,eq,true"] } }
    );
    const transformedData = (response.data as PlanetsResponse).bodies.map(
      transformPlanetData
    );
    return transformedData;
  },
};
