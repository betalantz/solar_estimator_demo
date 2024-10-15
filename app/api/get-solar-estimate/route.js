// app/api/get-solar-estimate.js

import { NextResponse } from "next/server";

export async function GET(request) {
  console.log("API route hit!");
  const url = new URL(request.url);
  console.log("🚀 ~ GET ~ url:", url)
  
  const apiKey = process.env.NEXT_PUBLIC_SOLCAST_API_KEY;
  const latitude = url.searchParams.get('latitude');
  const longitude = url.searchParams.get('longitude');
  const hours = url.searchParams.get('hours') || '24';
  const period = url.searchParams.get('period') || 'PT30M';
  const outputParameters = url.searchParams.get('output_parameters') || 'pv_power_rooftop';
  const azimuth = url.searchParams.get('azimuth');
  const capacity = url.searchParams.get('capacity');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
  };
  const azimuthMapper = {
    "north": "0",
    "west": "90",
    "south": "180",
    "east": "-90"
  };
  // try {
  //   const url = new URL(request.url);

  //   const apiKey = process.env.NEXT_PUBLIC_SOLCAST_API_KEY;
  //   console.log("🚀 ~ GET ~ apiKey:", apiKey);
  //   const latitude = url.searchParams.get("latitude");
  //   const longitude = url.searchParams.get("longitude");
  //   const hours = url.searchParams.get("hours") || "24";
  //   const period = url.searchParams.get("period") || "PT30M";
  //   const outputParameters =
  //     url.searchParams.get("output_parameters") || "pv_power_rooftop";
  //   const azimuth = url.searchParams.get("azimuth");
  //   const capacity = url.searchParams.get("capacity");

  //   // You can add validation logic here if needed
  //   console.log("Received params:", {
  //     latitude,
  //     longitude,
  //     hours,
  //     period,
  //     outputParameters,
  //     azimuth,
  //     capacity,
  //   });

  //   return NextResponse.json({
  //     message: "API route working!",
  //     params: {
  //       latitude,
  //       longitude,
  //       hours,
  //       period,
  //       outputParameters,
  //       azimuth,
  //       capacity,
  //     },
  //   });
  // } catch (error) {
  //   console.error("Error processing API request:", error);
  //   return NextResponse.json(
  //     { error: "Failed to process request" },
  //     { status: 500 }
  //   );
  // }
   try {

  
    const response = await fetch(`https://api.solcast.com.au/data/forecast/rooftop_pv_power?latitude=${latitude}&longitude=${longitude}&hours=${hours}&period=${period}&output_parameters=${outputParameters}&azimuth=${azimuthMapper[azimuth]}&capacity=${capacity}&format=json`, requestOptions);
    const data = await response.json();
    console.log("🚀 ~ GET ~ data:", data)

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching solar estimate:', error);
    return NextResponse.json({ error: 'Failed to fetch solar estimate' }, { status: 500 });
  }
}
