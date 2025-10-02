"use client";

import { useState } from "react";
import { Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { simulateRolePlay } from "@/ai/flows/simulate-role-play-scenarios";
import { Input } from "@/components/ui/input";
import { useGoals } from "@/context/goals-context";
import { useProgress } from "@/context/progress-context";

export default function RolePlayForm() {
  const [scenario, setScenario] = useState("");
  const [persona, setPersona] = useState("");
  const [conversation, setConversation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { achieveGoal } = useGoals();
  const { logActivity } = useProgress();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setConversation(null);

    try {
      const result = await simulateRolePlay({
        scenarioDescription: scenario,
        userPersona: persona,
      });
      setConversation(result.conversation);
      achieveGoal('first-chapter');
      logActivity('role-play');

      const sessionKey = 'role-play-simulations';
      const currentCount = parseInt(sessionStorage.getItem(sessionKey) || '0') + 1;
      sessionStorage.setItem(sessionKey, currentCount.toString());

      if (currentCount >= 10) {
        achieveGoal('social-butterfly');
      }

    } catch (err) {
      setError("Sorry, we couldn't run the simulation at this time. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Conversation Simulator</CardTitle>
          <CardDescription>Practice any conversation by describing the situation below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="scenario">The Scenario</Label>
              <Textarea
                id="scenario"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="e.g., Asking for a promotion, making small talk at a party, a difficult conversation with a friend."
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="persona">Your Persona</Label>
              <Input
                id="persona"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="e.g., a shy person, a confident leader, an anxious student."
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Simulation
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && <p className="text-destructive text-center">{error}</p>}

      {conversation && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline">Simulation Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-card rounded-md border whitespace-pre-wrap text-sm">
                {conversation}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
