const axios = require("axios");
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://hackaviz-api.herokuapp.com/api"
    : "http://127.0.0.1:5000/api";
const queryString = require("query-string");

const API_CLIENT = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-type": "application/json" },
});

const getContinents = async () =>
  await API_CLIENT.get("/continents")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

const getPortCount = async (selectedRegion) =>
  await API_CLIENT.get("/ports/count?" + `region=${selectedRegion}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

const getShipCount = async (selectedRegion) =>
  await API_CLIENT.get("/ships/count?" + `region=${selectedRegion}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
const getPorts = async (region = null) => {
  const url = region ? `/ports?${region}` : `/ports`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getHinterlands = async () => {
  const url = `/ports/hinterlands`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getShipTravels = async (start_region = "ALL", end_region = "ALL") => {
  const params = queryString.stringify(
    { start_region, end_region },
    { sort: false }
  );
  const url = start_region ? `/ports/trajets?${params}` : `/ports/trajets`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getPortsRelations = async () =>
  await API_CLIENT.get("/ports/relations")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

const getPortsImportations = async (country, type = "values") => {
  const url = country
    ? `/ports/goods/importations?country=${country}&type=${type}`
    : `/ports/goods/exportations?&type=${type}`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getPortsExportations = async (country, type = "values") => {
  const url = country
    ? `/ports/goods/exportations?country=${country}&data_type=${type}`
    : `/ports/goods/exportations?&type=${type}`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getMarseilleGoods = async (type = "in") => {
  return await API_CLIENT.get(`/ports/goods/marseille/${type}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getMarseillePassengers = async (type = "in") => {
  return await API_CLIENT.get(`/ports/passengers/marseille/${type}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getMarseilleToileIndustrialoPortuaire = async () => {
  return await API_CLIENT.get(`/ports/marseille/toile-industrialo-portuaire`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getMarseilleGoodsMonthlyEvolution = async (type = "in") => {
  return await API_CLIENT.get(
    `/ports/goods/marseille/monthly-evolution?type=${type}`
  )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getMarseillePassengersMonthlyEvolution = async (type = "in") => {
  return await API_CLIENT.get(
    `/ports/passengers/marseille/monthly-evolution?type=${type}`
  )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getNaviresData = async () => {
  return await API_CLIENT.get(`/ports/trajets/analytics`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getTrafficRoutierData = async (year = "2018") => {
  const params = queryString.stringify({ year }, { sort: false });
  const url = year
    ? `/containers/traffic-routier?` + params
    : `/containers/traffic-routier`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getShocks = async () => {
  return await API_CLIENT.get("/containers/sensors/shocks")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getSensorTypes = async () => {
  return await API_CLIENT.get("/containers/sensors/types")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getSensorsPosition = async (type) => {
  const params = queryString.stringify({ type }, { sort: false });
  const url = type ? `/containers/sensors?` + params : `/containers/sensors`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getTrajetsContainers = async () => {
  const url = `/containers/trajets`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getMarseilleRelatedPorts = async () => {
  const url = `/ports/analytics`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getForecast = async (
  temperature,
  wind_speed,
  visibility,
  pressure,
  snow_height
) => {
  const url = `/ports/ai?temperature=${temperature}&wind_speed=${wind_speed}&visibility=${visibility}&pressure=${pressure}&snow_height=${snow_height}`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const searchContainerDetails = async (equipment_number) =>
{
  const url = `/containers/sensors/details?equipment_number=${equipment_number}`;
  return await API_CLIENT.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};


export {
  getShipTravels,
  getContinents,
  getPorts,
  getPortCount,
  getShipCount,
  getPortsRelations,
  getPortsExportations,
  getPortsImportations,
  getMarseilleGoods,
  getMarseilleGoodsMonthlyEvolution,
  getNaviresData,
  getHinterlands,
  getMarseilleToileIndustrialoPortuaire,
  getMarseillePassengersMonthlyEvolution,
  getMarseillePassengers,
  getTrafficRoutierData,
  getShocks,
  getSensorsPosition,
  getSensorTypes,
  getTrajetsContainers,
  getMarseilleRelatedPorts,
  getForecast,
  searchContainerDetails
};
