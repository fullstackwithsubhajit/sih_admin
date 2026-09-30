export function Badge({ children, tone="blue" }: { children: React.ReactNode; tone?: "green"|"yellow"|"red"|"blue"|"gray" }) { return <span className={`badge ${tone}`}>{children}</span>; }
