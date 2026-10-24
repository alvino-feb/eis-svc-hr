import * as service 
from "./employee.information.services.js";

import {
  successListResponse,
  successDetailResponse,
  successCreatedResponse,
  successUpdatedResponse,
  successDeletedResponse,
} from "../../../common/helpers/response.js";

export const list = async (
  req,
  res,
  next
) => {
  try {

    return successListResponse(
      res,
      await service.list(
        req.query
      )
    );

  } catch (err) {
    next(err);
  }
};

export const create = async (
  req,
  res,
  next
) => {
  try {    
  
    return successCreatedResponse(
      res,
      await service.create(req.body)
    );

  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req,
  res,
  next
) => {
  try {    
  
    return successCreatedResponse(
      res,
      await service.createProduct(req.body)
    );

  } catch (err) {
    next(err);
  }
};

export const update = async (
  req,
  res,
  next
) => {
  try {
    
    return successUpdatedResponse(
      res,
      await service.update(
        req.query.businessId,
        req.query.businessMemberId,
        req.query.id,
        req.body
      )
    );

  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req,
  res,
  next
) => {
  try {
    
    return successUpdatedResponse(
      res,
      await service.updateProduct(
        req.query.businessId,
        req.query.businessMemberId,
        req.query.pricelistId,
        req.query.productId,
        req.query.id,
        req.body
      )
    );

  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req,
  res,
  next
) => {
  try {

    return successDeletedResponse(
      res,
      await service.remove(
        req.query.businessId,
        req.query.businessMemberId,
        req.query.id
      )
    );

  } catch (err) {
    next(err);
  }
};

export const removeProduct = async (
  req,
  res,
  next
) => {
  try {

    return successDeletedResponse(
      res,
      await service.removeProduct(
        req.query.businessId,
        req.query.businessMemberId,
        req.query.id
      )
    );

  } catch (err) {
    next(err);
  }
};