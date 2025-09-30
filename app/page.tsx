import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Student = {
  id: string;
  name: string;
};

const students: Student[] = [
  { id: "0191CS231189", name: "Prakhar Shrivastav" },
  { id: "0191CS231142", name: "Keerti Bisen" },
  { id: "0191CS231034", name: "Aman Mishra" },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-200 fixed w-full bg-white z-50">
        <div className="text-2xl font-bold tracking-wide">IRM Portal</div>
        <div className="space-x-3">
          <Button className="bg-black text-white hover:bg-gray-800">
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to the IRM Portal
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-8">
          Manage incubation resources, students, and live attendance in one
          simple dashboard.
        </p>

        {/* Student List (Minimal Table inside Hero) */}
        <Card className="w-full md:w-2/3 lg:w-1/2 shadow-sm border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="p-3 text-sm font-medium text-gray-700">
                      ENROLLMENT NO.
                    </th>
                    <th className="p-3 text-sm font-medium text-gray-700">
                      NAME
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`transition ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="p-3 text-sm">{student.id}</td>
                      <td className="p-3 text-sm">{student.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </header>
    </div>
  );
};

export default HomePage;
