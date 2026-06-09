import React from 'react';
import { useGetUsersQuery } from '../store/api/apiSlice';

const Users = () => {
    const { data: users = [], isLoading } = useGetUsersQuery();

    if (isLoading) return <div className="text-center py-20 text-white">Yuklanmoqda...</div>;

    return (
        <div className="container mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-10">Hamjamiyat</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {users.map((u) => (
                    <div key={u.id} className="bg-[#111] p-6 rounded-xl border border-gray-800">
                        <img src={u.avatar} alt={u.name} className="w-16 h-16 rounded-full mx-auto mb-4 border border-white" />
                        <h3 className="font-bold text-white">{u.name}</h3>
                        <p className="text-gray-500 text-xs mb-3">{u.email}</p>
                        <span className="bg-white text-black px-3 py-1 rounded text-[10px] font-black uppercase">{u.role}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;