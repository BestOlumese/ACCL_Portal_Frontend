import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Link } from "react-router-dom";

export default function AuthWrapper({
  children,
  title,
  description,
  link,
  footer,
}) {
  return (
    <Card className="w-[400px] shadow-sm">
      <CardHeader className="text-center">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-slate-500 font-medium text-[13px]">{description}</p>
      </CardHeader>
      <CardContent>
      {children}
      </CardContent>
      <CardFooter className="text-center flex items-center justify-center">
        <Link to={link} className="font-medium text-slate-500 hover:text-black hover:underline">{footer}</Link>
      </CardFooter>
    </Card>
  );
}
