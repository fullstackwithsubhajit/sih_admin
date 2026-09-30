import Link from "next/link";
export function PageHeader({title,description,action,href}: {title:string;description?:string;action?:string;href?:string}) { return <div className="page-header"><div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && href && <Link className="primary-btn" href={href}>+ {action}</Link>}</div> }
