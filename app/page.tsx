"use client";

import { useEffect, useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ResponsiveLine } from "@nivo/line";
import { mockApiResponse, calculateAnnualPowerOutput } from "@/lib/mockApi";
import { locales, Location } from "@/lib/unmetered_locations";


export default function Dashboard() {
  const [address, setAddress] = useState<string>("");
  const [locationInput, setLocationInput] = useState<"address" | "location" | "unmet-locale">("address");
  const [location, setLocation] = useState<Location | null>(null);
  const [direction, setDirection] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [annualOutput, setAnnualOutput] = useState<number>(0);
  const [locale, setLocale] = useState<string>("");

  console.log("Component mounted, initial location:", location);

  useEffect(() => {
    console.log("Effect ran, location:", location);
  }, [location]);

  useEffect(() => {
    const output = calculateAnnualPowerOutput();
    setAnnualOutput(output);
  }, []);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation successful, position:", position);
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          console.log("Set location:", location);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  const handleLocationRadios = (value: string) => {
    setLocationInput(value as "address" | "location" | "unmet-locale");
  };

  const handleLocaleChange = (value: string) => {
    const selectedLocale = locales[value as keyof typeof locales];
  
    if (selectedLocale) {
      setLocale(value);
      setLocation(selectedLocale);
    } else {
      console.warn("Invalid locale value:", value);
    }
  };

  const handleDirectionChange = (value: string) => setDirection(value);

  const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => setCapacity(e.target.value);

  const apiKey = process.env.NEXT_PUBLIC_SOLCAST_API_KEY;
  console.log("🚀 ~ Dashboard ~ apiKey:", apiKey);

  const handleGetEstimate = async () => {
    if (!location) {
      console.error("Location not set");
      return;
    }

    const url = new URL("/api/get-solar-estimate", window.location.origin);
    url.searchParams.append("latitude", location.lat.toString());
    url.searchParams.append("longitude", location.long.toString());
    url.searchParams.append("hours", "24");
    url.searchParams.append("period", "PT30M");
    url.searchParams.append("output_parameters", "pv_power_rooftop");
    url.searchParams.append("azimuth", direction);
    url.searchParams.append("capacity", capacity);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Solar Estimate Data:", data);
      // Handle the data as needed
    } catch (error) {
      console.error("Error getting solar estimate:", error);
    }
  };

  const localeSelectors = Object.keys(locales).map((name) => (
    <SelectItem key={name} value={name}>
      {name}
    </SelectItem>
  ));

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Solar Estimate</CardTitle>
          <CardDescription>
            Enter your location and solar array details to get an estimate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-4">
              <RadioGroup
                defaultValue="address"
                className="flex items-center gap-4"
                onValueChange={handleLocationRadios}
              >
                <Label htmlFor="address-radio">
                  <RadioGroupItem id="address-radio" value="address" />
                  Enter Address
                </Label>
                <Label htmlFor="location-radio">
                  <RadioGroupItem id="location-radio" value="location" />
                  Use Current Location
                </Label>
                <Label htmlFor="unmetered-radio">
                  <RadioGroupItem id="unmetered-radio" value="unmet-locale" />
                  Use Free Location
                </Label>
              </RadioGroup>
              {locationInput === "address" && (
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" value={address} onChange={handleAddressChange} required />
                </div>
              )}
              {locationInput === "location" && (
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Button onClick={handleGetLocation}>Use Current Location</Button>
                  {location && (
                    <div>
                      Latitude: {location.lat}, Longitude: {location.long}
                    </div>
                  )}
                </div>
              )}
              {locationInput === "unmet-locale" && (
                <div className="grid gap-2">
                  <Label htmlFor="unmet_locale">Locale</Label>
                  <Select id="unmet_locale" onValueChange={handleLocaleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select locale" />
                    </SelectTrigger>
                    <SelectContent>{localeSelectors}</SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto" onClick={handleGetEstimate}>
            Get Estimate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}