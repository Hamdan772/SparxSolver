'use server';
/**
 * @fileOverview Simulates role-play scenarios for practicing social interactions.
 *
 * - simulateRolePlay - A function to simulate a role-play scenario.
 * - SimulateRolePlayInput - The input type for the simulateRolePlay function.
 * - SimulateRolePlayOutput - The return type for the simulateRolePlay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateRolePlayInputSchema = z.object({
  scenarioDescription: z
    .string()
    .describe('A description of the role-play scenario to simulate.'),
  userPersona: z
    .string()
    .describe('A description of the user persona in the scenario.'),
});
export type SimulateRolePlayInput = z.infer<typeof SimulateRolePlayInputSchema>;

const SimulateRolePlayOutputSchema = z.object({
  conversation: z
    .string()
    .describe('The simulated conversation between the user and others.'),
});
export type SimulateRolePlayOutput = z.infer<typeof SimulateRolePlayOutputSchema>;

export async function simulateRolePlay(
  input: SimulateRolePlayInput
): Promise<SimulateRolePlayOutput> {
  return simulateRolePlayFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateRolePlayPrompt',
  input: {schema: SimulateRolePlayInputSchema},
  output: {schema: SimulateRolePlayOutputSchema},
  prompt: `You are a sophisticated AI role-playing simulator. You will simulate a social interaction based on a scenario provided by the user. The user's name is "User".

Scenario: {{{scenarioDescription}}}

User Persona: {{{userPersona}}}

Simulate the conversation, providing engaging and realistic dialogue. Focus on helping the user practice their conversational skills in this scenario.`,
});

const simulateRolePlayFlow = ai.defineFlow(
  {
    name: 'simulateRolePlayFlow',
    inputSchema: SimulateRolePlayInputSchema,
    outputSchema: SimulateRolePlayOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
