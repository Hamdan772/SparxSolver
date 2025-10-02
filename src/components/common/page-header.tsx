
"use client";

type PageHeaderProps = {
  title: string;
};

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-semibold ai-gradient-text">{title}</h1>
    </div>
  );
}
