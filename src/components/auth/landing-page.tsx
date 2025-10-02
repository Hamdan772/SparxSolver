"use client";

import { LogIn, Sparkles, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "./auth-provider";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";


const features = [
    {
      title: 'Practice with AI',
      description: 'Hone your conversation skills in realistic, simulated scenarios.',
    },
    {
      title: 'Get Instant Feedback',
      description: 'Receive guidance on public speaking and confidence from an AI coach.',
    },
    {
      title: 'Break the Ice',
      description: 'Generate endless conversation starters for any situation.',
    },
];

const testimonials = [
    {
        name: "Sandapuma",
        review: "Social Spark has been a game-changer for my confidence. The AI coach is like having a personal mentor in my pocket. I've seen a real improvement in how I handle social situations."
    },
    {
        name: "Hamdan Nishard",
        review: "The role-play scenarios are incredibly helpful. I can practice difficult conversations in a safe space without any judgment. Highly recommended for anyone looking to improve their communication skills."
    },
    {
        name: "Sashu",
        review: "I used to dread networking events, but the conversation starters have made it so much easier to break the ice. This app is simple, effective, and beautifully designed."
    },
    {
        name: "Khanu",
        review: "As someone who struggles with public speaking, the Public Speaking Coach has been invaluable. The feedback is constructive and has helped me feel much more prepared and less anxious."
    },
    {
        name: "Sachin",
        review: "This is more than just an app; it's a guide to becoming a more confident and articulate person. The achievements system keeps me motivated to keep practicing. Five stars!"
    }
];

export default function LandingPage() {
    const { signIn } = useAuth();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center animate-fade-in-down">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold font-headline">Social Spark</span>
                </div>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Button onClick={signIn} variant="ghost" className="text-foreground/80 hover:text-foreground">
                        Sign In
                    </Button>
                    <Button onClick={signIn}>
                        Get Started <LogIn className="ml-2 h-4 w-4" />
                    </Button>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-24 md:py-32 lg:py-40">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-6 text-center animate-fade-in-up">
                            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm animate-fade-in-up">
                                Your journey to confidence starts now
                            </div>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-headline animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                Master Social Skills with AI
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                Your personal guide to building confidence, improving communication, and making meaningful connections.
                            </p>
                            <div className="flex flex-col gap-4 min-[400px]:flex-row animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <Button size="lg" onClick={signIn}>
                                    Start Practicing for Free
                                    <LogIn className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2 animate-fade-in-up">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Full Suite of AI-Powered Tools</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Everything you need to practice social interactions, get personalized feedback, and excel in your social life.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12 animate-stagger-in">
                            {features.map((feature, i) => (
                                <div key={feature.title} className="grid gap-4 p-6 rounded-lg border bg-card/60 hover:bg-muted/50 transition-colors" style={{ animationDelay: `${i * 150}ms` }}>
                                    <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2 animate-fade-in-up">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Loved by Users Worldwide</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    See what people are saying about their journey with Social Spark.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 animate-stagger-in">
                            {testimonials.map((testimonial, i) => (
                                <Card key={testimonial.name} className="flex flex-col justify-between" style={{ animationDelay: `${i * 150}ms` }}>
                                    <CardHeader>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{`"${testimonial.review}"`}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <p className="font-semibold font-headline">{testimonial.name}</p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">&copy; 2024 Social Spark. All rights reserved.</p>
            </footer>
        </div>
    )
}
