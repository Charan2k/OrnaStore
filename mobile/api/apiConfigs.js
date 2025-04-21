import axios from 'axios';

const BASE_URL = "http://192.168.1.4:8000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
});

export const API = {
    METAL: `${BASE_URL}/metal/latest/prices`,
    FETCH_ORNAMENTS: `${BASE_URL}/fetch-ornaments?page=:page&limit=:limit`,
    AVAILABLE_ORNAMENT_TYPES: `${BASE_URL}/available-ornament-types`
};
