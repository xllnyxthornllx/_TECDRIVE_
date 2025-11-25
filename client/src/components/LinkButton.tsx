import { Link } from "wouter";
import type { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
}

export function LinkButton({ href, children, className, "data-testid": testId }: LinkButtonProps) {
  return (
    <Link href={href}>
      <span className={className} data-testid={testId}>
        {children}
      </span>
    </Link>
  );
}
