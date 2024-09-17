import ContainerClient from "@/components/containers/ContainerClient";

export default function Documentation() {
    return (
        <ContainerClient classNames="mt-24">
            <h2 className="title">Dokumentasi Kegiatan</h2>
            <div className="flex flex-wrap gap-3 mt-5">
                {[1, 2, 3].map((item: any, i: number) => (
                    <img key={i} src="https://images.unsplash.com/photo-1726461974101-d98a3c616dcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D" className="w-56 h-36 object-cover rounded-md" alt="Image" />
                ))}
            </div>
        </ContainerClient>
    )
}
