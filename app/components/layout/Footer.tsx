export const Footer = () => {
    return (
        <footer className="w-full border-t bg-background py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} E-Commerce Platform. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
