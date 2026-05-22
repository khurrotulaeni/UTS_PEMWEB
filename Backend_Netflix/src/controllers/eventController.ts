import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua event
export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany();

        res.status(200).json(events);

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data event",
            error
        });
    }
};

// 2. Menyimpan event
export const createEvents = async (req: Request, res: Response) => {
    try {
        const { name, dateEvent, location, description } = req.body;

        // validasi
        if (!name || !dateEvent || !location || !description) {
            return res.status(400).json({
                message: "Semua Field Harus Diisi"
            });
        }

        // simpan ke database
        const event = await prisma.event.create({
            data: {
                name,
                date: dateEvent,
                location,
                description
            }
        });

        res.status(201).json({
            message: "Event Berhasil Disimpan",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan event",
            error
        });
    }
};

// 3. Menampilkan event berdasarkan id
export const showEvents = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const event = await prisma.event.findUnique({
            where: { id }
        });

        if (!event) {
            return res.status(404).json({
                message: "Event Tidak Ditemukan"
            });
        }

        res.status(200).json(event);

    } catch (error) {
        res.status(500).json({
            message: "Terjadi Kesalahan",
            error
        });
    }
};

// 4. Update event
export const updateEvents = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const { name, dateEvent, location, description } = req.body;

        const event = await prisma.event.update({
            where: { id },
            data: {
                name,
                dateEvent,
                location,
                description
            }
        });

        res.status(200).json({
            message: "Event Berhasil Diupdate",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal update event",
            error
        });
    }
};

// 5. Delete event
export const deleteEvents = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await prisma.event.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Event Berhasil Dihapus"
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus event",
            error
        });
    }
};