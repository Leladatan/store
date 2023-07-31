import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
      const UserId: string | null = auth().userId;
      const body = await req.json();

      const {name} = body;

      if (!UserId) {
          return new NextResponse("Unauthorized", {status: 401});
      }

      if (!name) {
          return new NextResponse("Name is required", {status: 400});
      }

      const store = await prismadb.store.create({
          data: {
              UserId,
              name
          }
      });

      return NextResponse.json(store)
  } catch (error) {
      console.log('[STORES_POST]', error);
      return new NextResponse("Interval error", {status: 500});
  }
};
