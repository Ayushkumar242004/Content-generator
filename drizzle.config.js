/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/Schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://neondb_owner:GWe89yvsUloM@ep-young-salad-a5qtsfkq.us-east-2.aws.neon.tech/Ai-content-creater?sslmode=require',
    }
  };