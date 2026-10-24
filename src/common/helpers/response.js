export const successResponse = (
  res,
  data = null,
  message = "Success",
  statusCode = 200,
  meta = null
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

export const successListResponse = (
  res,
  data,
  meta,
  message = "Data fetched successfully"
) => {
  return successResponse(
    res,
    data,
    message,
    200,
    meta
  );
};

export const successDetailResponse = (
  res,
  data,
  message = "Data fetched successfully"
) => {
  return successResponse(
    res,
    data,
    message
  );
};

export const successCreatedResponse = (
  res,
  data,
  message = "Data created successfully"
) => {
  return successResponse(
    res,
    data,
    message,
    201
  );
};

export const successUpdatedResponse = (
  res,
  data,
  message = "Data updated successfully"
) => {
  return successResponse(
    res,
    data,
    message
  );
};

export const successDeletedResponse = (
  res,
  data,
  message = "Data deleted successfully"
) => {
  return successResponse(
    res,
    data,
    message
  );
};

export const errorResponse = (
  res,
  message,
  status = 400
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};