import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
export default async function Dashboard() {
    const session = await getServerSession();
    if(!session){
        redirect('/')
    }
    return <div className="flex min-h-screen flex-col items-center p-24 justify-between">DASHBOARD</div>
}