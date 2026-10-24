import prisma 
from "../../../common/constants/prisma.js";

import { BaseRepository } from "../../../common/base/repositoryv2.js";

export default new BaseRepository(
  prisma.employee
);