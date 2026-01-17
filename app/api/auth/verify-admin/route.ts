import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            return NextResponse.json(
                { isAdmin: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        const userEmail = session.user.email;
        const adminEmail = process.env.ADMIN_EMAIL;

        const isAdmin = userEmail === adminEmail;

        return NextResponse.json({
            isAdmin,
            email: userEmail,
        });
    } catch (error: any) {
        return NextResponse.json(
            { isAdmin: false, error: error.message },
            { status: 500 }
        );
    }
}
