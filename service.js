import { ENV } from './src/common/constants/env.js';

import app from "./src/app.js";

const PORT = ENV.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Service HR running on port ${PORT}`);
});