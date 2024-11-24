import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const getTokenFromCookies = (req: NextRequest) => {
    const token = req.cookies.get("token");
    return token;
};

export function middleware(req: NextRequest) {
    const token = getTokenFromCookies(req)?.value;

    if (!token) {
        if (!req.url.includes("/signin") && !req.url.includes("/signup")) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};
