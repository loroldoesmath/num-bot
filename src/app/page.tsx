
"use client";

import { useState } from "react";
import { problemSolver, ProblemSolverOutput } from "@/ai/flows/problem-solver";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState<ProblemSolverOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProblemSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await problemSolver({ problem });
      setSolution(result);
    } catch (error) {
      console.error("Error solving problem:", error);
      // Implement better error handling here, e.g., display an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Number Theory Ace</h1>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-lg font-semibold">Problem Input</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Textarea
            placeholder="Enter your number theory problem here..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="resize-none"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleProblemSubmit} disabled={isLoading}>
            {isLoading ? "Solving..." : "Solve Problem"}
          </Button>
        </CardFooter>
      </Card>

      {solution && (
        <Card className="w-full max-w-2xl mt-8">
          <CardHeader>
            <h2 className="text-lg font-semibold">Solution</h2>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line">{solution.solution}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

