import Link from "next/link";

export default function Paginatioon({totalPages,currentPage }){
    const prevPage = parseInt(currentPage) -1 > 0
    const nextPage = parseInt(currentPage) +1 <= parseInt(totalPages)
    return(
        <div className="space-y-2 pt-6 md:space-y-5">
            <nav className="flex justify-between">
                {!prevPage &&(
                    <button rel="previa" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
                        Pagina anterior
                    </button>
                )}
                {prevPage && (
                    <Link href={currentPage-1 === 1 ? `/blog/`:`/blog/page/${currentPage-1}`}>
                        <button rel="previa"></button>
                    </Link>
                )}
                <span>
                    {currentPage} of {totalPages}
                </span>
                {!nextPage && (
                    <button rel="sigiente" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
                        Siguiente
                    </button>
                )}
                {nextPage && (
                    <Link href={`/blog/page/${currentPage+1}`}>
                        <button rel="sigiente">Siguiente</button>
                    </Link>
                )

                }

            </nav>

        </div>
    );
}