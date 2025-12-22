import type { JwtPayload } from "jsonwebtoken";
export interface AuthPayload extends JwtPayload {
    id: string;
    role: "admin" | "member";
    memberId?: string;
}
//# sourceMappingURL=jwt.d.ts.map