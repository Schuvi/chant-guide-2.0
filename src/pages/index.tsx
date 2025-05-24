import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
    component: IndexComponent
})

function IndexComponent() {
    return (
        <>
            <h1 className="text-red-500">Mnatpa</h1>
        </>
    )
}