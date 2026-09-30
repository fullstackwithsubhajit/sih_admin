"use client";

import { useMemo, useState } from "react";
import {
    BedDouble,
    Building2,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    DoorOpen,
    Search,
    Users,
    Wifi,
    Wind,
    Bath,
    BookOpen,
    UserRound,
    X,
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { students } from "@/lib/data/students";

type RoomStatus = "Available" | "Occupied" | "Reserved";

type Room = {
    id: string;
    number: string;
    block: string;
    floor: string;
    type: string;
    status: RoomStatus;
    capacity: number;
    occupied: number;
    price: string;
    facilities: string[];
};

const rooms: Room[] = [
    {
        id: "room-101",
        number: "101",
        block: "Block A",
        floor: "Ground Floor",
        type: "4 Bed AC",
        status: "Available",
        capacity: 4,
        occupied: 0,
        price: "₹65,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Attached Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-102",
        number: "102",
        block: "Block A",
        floor: "Ground Floor",
        type: "4 Bed AC",
        status: "Occupied",
        capacity: 4,
        occupied: 4,
        price: "₹65,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Attached Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-103",
        number: "103",
        block: "Block A",
        floor: "1st Floor",
        type: "4 Bed AC",
        status: "Available",
        capacity: 4,
        occupied: 0,
        price: "₹65,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Attached Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-104",
        number: "104",
        block: "Block A",
        floor: "1st Floor",
        type: "4 Bed AC",
        status: "Reserved",
        capacity: 4,
        occupied: 2,
        price: "₹65,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Attached Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-105",
        number: "105",
        block: "Block A",
        floor: "1st Floor",
        type: "4 Bed AC",
        status: "Occupied",
        capacity: 4,
        occupied: 4,
        price: "₹65,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Attached Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-106",
        number: "106",
        block: "Block A",
        floor: "1st Floor",
        type: "4 Bed AC",
        status: "Available",
        capacity: 4,
        occupied: 0,
        price: "₹65,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Attached Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-107",
        number: "107",
        block: "Block B",
        floor: "Ground Floor",
        type: "4 Bed Non-AC",
        status: "Occupied",
        capacity: 4,
        occupied: 4,
        price: "₹48,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Common Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-108",
        number: "108",
        block: "Block B",
        floor: "Ground Floor",
        type: "4 Bed Non-AC",
        status: "Available",
        capacity: 4,
        occupied: 0,
        price: "₹48,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Common Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-109",
        number: "109",
        block: "Block B",
        floor: "Ground Floor",
        type: "4 Bed Non-AC",
        status: "Reserved",
        capacity: 4,
        occupied: 2,
        price: "₹48,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Common Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-110",
        number: "110",
        block: "Block B",
        floor: "1st Floor",
        type: "4 Bed Non-AC",
        status: "Occupied",
        capacity: 4,
        occupied: 4,
        price: "₹48,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Common Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-111",
        number: "111",
        block: "Block B",
        floor: "1st Floor",
        type: "4 Bed Non-AC",
        status: "Available",
        capacity: 4,
        occupied: 0,
        price: "₹48,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Common Bathroom",
            "Study Table",
        ],
    },
    {
        id: "room-112",
        number: "112",
        block: "Block B",
        floor: "1st Floor",
        type: "4 Bed Non-AC",
        status: "Occupied",
        capacity: 4,
        occupied: 4,
        price: "₹48,000",
        facilities: [
            "Wi-Fi",
            "Fan",
            "Common Bathroom",
            "Study Table",
        ],
    },
];

type Allocation = {
    studentId: string;
    roomId: string;
    bedNumber: number;
    assignedOn: string;
};

export default function HostelManagement() {
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [studentSearch, setStudentSearch] = useState("");
    const [showStudentSelector, setShowStudentSelector] = useState(false);
    const [showRoomSelector, setShowRoomSelector] = useState(false);

    const [allocations, setAllocations] = useState<Allocation[]>([]);

    const selectedStudent = students.find(
        (student) => student.id === selectedStudentId
    );

    const selectedRoom = rooms.find(
        (room) => room.id === selectedRoomId
    );

    const filteredStudents = useMemo(() => {
        const query = studentSearch.trim().toLowerCase();

        if (!query) {
            return students;
        }

        return students.filter((student) => {
            return (
                student.name.toLowerCase().includes(query) ||
                student.id.toLowerCase().includes(query) ||
                student.department?.toLowerCase().includes(query)
            );
        });
    }, [studentSearch]);

    const availableRooms = rooms.filter(
        (room) =>
            room.status === "Available" &&
            room.occupied < room.capacity
    );

    const totalRooms = rooms.length;

    const occupiedRooms = rooms.filter(
        (room) => room.status === "Occupied"
    ).length;

    const availableRoomCount = availableRooms.length;

    const reservedRooms = rooms.filter(
        (room) => room.status === "Reserved"
    ).length;

    const getStudentAllocation = (studentId: string) => {
        return allocations.find(
            (allocation) => allocation.studentId === studentId
        );
    };

    const assignRoom = (room: Room) => {
        if (!selectedStudent) {
            return;
        }

        const existingAllocation = getStudentAllocation(
            selectedStudent.id
        );

        if (existingAllocation) {
            setAllocations((current) =>
                current.map((allocation) =>
                    allocation.studentId === selectedStudent.id
                        ? {
                              ...allocation,
                              roomId: room.id,
                              bedNumber:
                                  room.occupied + 1,
                              assignedOn:
                                  "30 Sep 2026",
                          }
                        : allocation
                )
            );
        } else {
            setAllocations((current) => [
                ...current,
                {
                    studentId: selectedStudent.id,
                    roomId: room.id,
                    bedNumber: room.occupied + 1,
                    assignedOn: "30 Sep 2026",
                },
            ]);
        }

        setSelectedRoomId(room.id);
        setShowRoomSelector(false);
    };

    const removeAllocation = () => {
        if (!selectedStudent) {
            return;
        }

        setAllocations((current) =>
            current.filter(
                (allocation) =>
                    allocation.studentId !==
                    selectedStudent.id
            )
        );

        setSelectedRoomId("");
    };

    const currentAllocation = selectedStudent
        ? getStudentAllocation(selectedStudent.id)
        : undefined;

    const currentRoom = currentAllocation
        ? rooms.find(
              (room) => room.id === currentAllocation.roomId
          )
        : undefined;

    return (
        <>
            <PageHeader
                title="Hostel Management"
                description="Assign hostel accommodation to admitted students and manage room allocation."
            />

            {/* =====================================================
                TOP STATS
            ===================================================== */}

            <div className="stats-grid four">
                <div className="stat-card icon-stat">
                    <div>
                        <span>Total Rooms</span>
                        <strong>{totalRooms}</strong>
                    </div>

                    <BedDouble size={21} />
                </div>

                <div className="stat-card icon-stat">
                    <div>
                        <span>Occupied</span>
                        <strong>{occupiedRooms}</strong>
                    </div>

                    <Users size={21} />
                </div>

                <div className="stat-card icon-stat">
                    <div>
                        <span>Available</span>
                        <strong>{availableRoomCount}</strong>
                    </div>

                    <CheckCircle2 size={21} />
                </div>

                <div className="stat-card icon-stat">
                    <div>
                        <span>Reserved</span>
                        <strong>{reservedRooms}</strong>
                    </div>

                    <Clock3 size={21} />
                </div>
            </div>

            {/* =====================================================
                STUDENT SELECTION
            ===================================================== */}

            <section className="panel hostel-student-panel">
                <div className="panel-head">
                    <div>
                        <h2>Assign Hostel to Student</h2>

                        <p>
                            Select an admitted student before assigning
                            a hostel room.
                        </p>
                    </div>

                    <UserRound size={21} />
                </div>

                {!selectedStudent ? (
                    <>
                        <div className="hostel-student-search">
                            <Search size={18} />

                            <input
                                type="text"
                                placeholder="Search admitted student by name, ID or department..."
                                value={studentSearch}
                                onChange={(event) =>
                                    setStudentSearch(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="hostel-student-list">
                            {filteredStudents.map((student) => (
                                <button
                                    key={student.id}
                                    type="button"
                                    className="hostel-student-card"
                                    onClick={() => {
                                        setSelectedStudentId(
                                            student.id
                                        );

                                        setShowRoomSelector(true);
                                    }}
                                >
                                    <div className="hostel-student-avatar">
                                        {student.name
                                            .split(" ")
                                            .map(
                                                (word) =>
                                                    word[0]
                                            )
                                            .join("")
                                            .slice(0, 2)}
                                    </div>

                                    <div>
                                        <strong>
                                            {student.name}
                                        </strong>

                                        <span>
                                            {student.id} •{" "}
                                            {student.department} •
                                            Semester{" "}
                                            {student.semester}
                                        </span>
                                    </div>

                                    <ChevronRight size={17} />
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="selected-hostel-student">
                        <div className="hostel-student-avatar large">
                            {selectedStudent.name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 2)}
                        </div>

                        <div className="selected-hostel-student-info">
                            <span>Selected Student</span>

                            <strong>
                                {selectedStudent.name}
                            </strong>

                            <p>
                                {selectedStudent.id} •{" "}
                                {selectedStudent.department} •
                                Semester{" "}
                                {selectedStudent.semester}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="change-student-button"
                            onClick={() => {
                                setSelectedStudentId("");
                                setSelectedRoomId("");
                                setShowRoomSelector(false);
                            }}
                        >
                            Change Student
                        </button>
                    </div>
                )}
            </section>

            {/* =====================================================
                ROOM SELECTION
            ===================================================== */}

            {selectedStudent && (
                <section className="panel hostel-room-selection">
                    <div className="panel-head">
                        <div>
                            <h2>
                                {currentRoom
                                    ? "Assigned Hostel Room"
                                    : "Choose Hostel Room"}
                            </h2>

                            <p>
                                {currentRoom
                                    ? "Current accommodation assigned to this student."
                                    : "Select an available room for the selected student."}
                            </p>
                        </div>

                        {!currentRoom && (
                            <button
                                type="button"
                                className="hostel-primary-button"
                                onClick={() =>
                                    setShowRoomSelector(
                                        (current) => !current
                                    )
                                }
                            >
                                {showRoomSelector
                                    ? "Hide Rooms"
                                    : "Select Room"}
                            </button>
                        )}
                    </div>

                    {!currentRoom && showRoomSelector && (
                        <div className="hostel-room-grid">
                            {availableRooms.map((room) => (
                                <button
                                    type="button"
                                    key={room.id}
                                    className="hostel-room-card available"
                                    onClick={() =>
                                        assignRoom(room)
                                    }
                                >
                                    <div className="room-card-top">
                                        <div>
                                            <span>
                                                Room
                                            </span>

                                            <strong>
                                                {room.number}
                                            </strong>
                                        </div>

                                        <span className="room-available-badge">
                                            Available
                                        </span>
                                    </div>

                                    <div className="room-card-type">
                                        {room.type}
                                    </div>

                                    <div className="room-card-capacity">
                                        <Users size={14} />

                                        {room.occupied}/
                                        {room.capacity} beds
                                    </div>

                                    <div className="room-card-facilities">
                                        {room.facilities
                                            .slice(0, 3)
                                            .map(
                                                (
                                                    facility
                                                ) => (
                                                    <span
                                                        key={
                                                            facility
                                                        }
                                                    >
                                                        {
                                                            facility
                                                        }
                                                    </span>
                                                )
                                            )}
                                    </div>

                                    <div className="room-card-bottom">
                                        <strong>
                                            {
                                                room.price
                                            }
                                            <small>
                                                {" "}
                                                / year
                                            </small>
                                        </strong>

                                        <span>
                                            Assign
                                            <ChevronRight
                                                size={
                                                    14
                                                }
                                            />
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* =====================================================
                MAKE MY TRIP STYLE HOSTEL DETAILS
            ===================================================== */}

            {selectedStudent && currentRoom && currentAllocation && (
                <section className="hostel-booking-card">
                    <div className="hostel-booking-header">
                        <div>
                            <span className="booking-label">
                                HOSTEL ALLOCATION
                            </span>

                            <h2>
                                {selectedStudent.name}'s
                                Accommodation
                            </h2>

                            <p>
                                Your hostel room has been
                                successfully assigned.
                            </p>
                        </div>

                        <span className="booking-active">
                            <CheckCircle2 size={14} />
                            Active
                        </span>
                    </div>

                    <div className="hostel-booking-main">
                        <div className="hostel-room-visual">
                            <div className="room-visual-icon">
                                <BedDouble size={44} />
                            </div>

                            <div>
                                <span>Room Number</span>

                                <strong>
                                    {currentRoom.number}
                                </strong>
                            </div>
                        </div>

                        <div className="hostel-booking-info">
                            <div>
                                <span>Hostel</span>
                                <strong>
                                    Campus Hostel
                                </strong>
                            </div>

                            <div>
                                <span>Block</span>
                                <strong>
                                    {currentRoom.block}
                                </strong>
                            </div>

                            <div>
                                <span>Floor</span>
                                <strong>
                                    {currentRoom.floor}
                                </strong>
                            </div>

                            <div>
                                <span>Room Type</span>
                                <strong>
                                    {currentRoom.type}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="hostel-booking-divider" />

                    <div className="hostel-booking-details">
                        <div className="booking-detail">
                            <div className="booking-detail-icon">
                                <BedDouble size={17} />
                            </div>

                            <div>
                                <span>Bed Assigned</span>

                                <strong>
                                    Bed{" "}
                                    {
                                        currentAllocation.bedNumber
                                    }
                                </strong>
                            </div>
                        </div>

                        <div className="booking-detail">
                            <div className="booking-detail-icon">
                                <CalendarDays size={17} />
                            </div>

                            <div>
                                <span>Assigned On</span>

                                <strong>
                                    {
                                        currentAllocation.assignedOn
                                    }
                                </strong>
                            </div>
                        </div>

                        <div className="booking-detail">
                            <div className="booking-detail-icon">
                                <Users size={17} />
                            </div>

                            <div>
                                <span>Occupancy</span>

                                <strong>
                                    {currentRoom.occupied +
                                        1}{" "}
                                    /{" "}
                                    {currentRoom.capacity} Beds
                                </strong>
                            </div>
                        </div>

                        <div className="booking-detail">
                            <div className="booking-detail-icon">
                                <Building2 size={17} />
                            </div>

                            <div>
                                <span>Hostel Fee</span>

                                <strong>
                                    {currentRoom.price} / Year
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="hostel-booking-divider" />

                    <div className="hostel-facilities">
                        <div className="facilities-heading">
                            <h3>Room Facilities</h3>

                            <span>
                                Included with accommodation
                            </span>
                        </div>

                        <div className="facility-list">
                            {currentRoom.facilities.map(
                                (facility) => {
                                    let Icon = BookOpen;

                                    if (
                                        facility.includes(
                                            "Wi-Fi"
                                        )
                                    ) {
                                        Icon = Wifi;
                                    }

                                    if (
                                        facility.includes(
                                            "Fan"
                                        )
                                    ) {
                                        Icon = Wind;
                                    }

                                    if (
                                        facility.includes(
                                            "Bathroom"
                                        )
                                    ) {
                                        Icon = Bath;
                                    }

                                    if (
                                        facility.includes(
                                            "Study"
                                        )
                                    ) {
                                        Icon = BookOpen;
                                    }

                                    return (
                                        <div
                                            className="facility-item"
                                            key={facility}
                                        >
                                            <Icon
                                                size={17}
                                            />

                                            <span>
                                                {facility}
                                            </span>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    <div className="hostel-booking-footer">
                        <div>
                            <span>
                                Student
                            </span>

                            <strong>
                                {selectedStudent.name}
                            </strong>
                        </div>

                        <div className="hostel-booking-actions">
                            <button
                                type="button"
                                className="hostel-secondary-button"
                                onClick={() => {
                                    setSelectedRoomId("");
                                    setShowRoomSelector(
                                        true
                                    );
                                }}
                            >
                                Change Room
                            </button>

                            <button
                                type="button"
                                className="hostel-danger-button"
                                onClick={
                                    removeAllocation
                                }
                            >
                                Remove Allocation
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                ROOM OVERVIEW
            ===================================================== */}

            <section className="panel hostel-overview-panel">
                <div className="panel-head">
                    <div>
                        <h2>Room Overview</h2>

                        <p>
                            Current hostel room availability and
                            occupancy.
                        </p>
                    </div>

                    <div className="hostel-legend">
                        <span className="legend-available">
                            Available
                        </span>

                        <span className="legend-occupied">
                            Occupied
                        </span>

                        <span className="legend-reserved">
                            Reserved
                        </span>
                    </div>
                </div>

                <div className="hostel-overview-grid">
                    {rooms.map((room) => (
                        <button
                            type="button"
                            key={room.id}
                            className={`overview-room ${room.status.toLowerCase()}`}
                            onClick={() => {
                                if (
                                    room.status ===
                                    "Available" &&
                                    selectedStudent
                                ) {
                                    assignRoom(room);
                                }
                            }}
                        >
                            <strong>
                                {room.number}
                            </strong>

                            <span>
                                {room.status}
                            </span>

                            <small>
                                {room.occupied}/
                                {room.capacity} beds
                            </small>
                        </button>
                    ))}
                </div>
            </section>
        </>
    );
}