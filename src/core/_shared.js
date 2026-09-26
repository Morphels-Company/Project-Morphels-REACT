import {sql} from "../../db.js";

export const inMyInstitution = (userId, column = sql`branch`) => sql`${column} IN (
  SELECT b.id FROM branches b JOIN sectors s ON s.id = b.sector
  WHERE s.institution = (
    SELECT s2.institution FROM users u
    JOIN branches ub ON ub.id = u.branch
    JOIN sectors s2 ON s2.id = ub.sector
    WHERE u.id = ${userId}))`;