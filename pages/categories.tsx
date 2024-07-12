import axios from "axios";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function Categories() {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/categories/get-categories');
                setCategories(res.data);
            }
            catch(e: any) {
                console.error(e.message);
            }
        }
        fetchCategories();
    }, [])

    return (
        <div>
            <Header />
            <div>
            {
                categories?.map((c, ind) => (
                    <div key={ind}>
                        <div>{c.name}</div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}