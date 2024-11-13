import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const schools = await prisma.school.createMany({
    data: [
      {
        id: "1",
        name: "Trường THPT Hà Nội",
        address: "123 Đống Đa",
        city: "Hà Nội",
        country: "Việt Nam",
      },
      {
        id: "2",
        name: "Trường THPT Chu Văn An",
        address: "456 Ba Đình",
        city: "Hà Nội",
        country: "Việt Nam",
      },
      {
        id: "3",
        name: "Trường THPT Chuyên Hà Nội - Amsterdam",
        address: "789 Cầu Giấy",
        city: "Hà Nội",
        country: "Việt Nam",
      },
      {
        id: "4",
        name: "Trường THPT Nguyễn Huệ",
        address: "101 Tây Hồ",
        city: "Hà Nội",
        country: "Việt Nam",
      },
      {
        id: "5",
        name: "Trường THPT Trần Phú",
        address: "111 Hai Bà Trưng",
        city: "Hà Nội",
        country: "Việt Nam",
      },
      {
        id: "6",
        name: "Trường THPT Hồ Chí Minh",
        address: "123 Quận 1",
        city: "Hồ Chí Minh",
        country: "Việt Nam",
      },
      {
        id: "7",
        name: "Trường THPT Lê Hồng Phong",
        address: "456 Quận 5",
        city: "Hồ Chí Minh",
        country: "Việt Nam",
      },
      {
        id: "8",
        name: "Trường THPT Gia Định",
        address: "789 Quận Bình Thạnh",
        city: "Hồ Chí Minh",
        country: "Việt Nam",
      },
      {
        id: "9",
        name: "Trường THPT Nguyễn Thị Minh Khai",
        address: "111 Quận 3",
        city: "Hồ Chí Minh",
        country: "Việt Nam",
      },
      {
        id: "10",
        name: "Trường THPT Phổ Thông Năng Khiếu",
        address: "222 Quận 10",
        city: "Hồ Chí Minh",
        country: "Việt Nam",
      },
      {
        id: "11",
        name: "Trường THPT Phan Bội Châu",
        address: "333 Ngô Quyền",
        city: "Đà Nẵng",
        country: "Việt Nam",
      },
      {
        id: "12",
        name: "Trường THPT Chuyên Lê Quý Đôn",
        address: "444 Hải Châu",
        city: "Đà Nẵng",
        country: "Việt Nam",
      },
      {
        id: "13",
        name: "Trường THPT Nguyễn Trãi",
        address: "555 Sơn Trà",
        city: "Đà Nẵng",
        country: "Việt Nam",
      },
      {
        id: "14",
        name: "Trường THPT Thái Phiên",
        address: "666 Thanh Khê",
        city: "Đà Nẵng",
        country: "Việt Nam",
      },
      {
        id: "15",
        name: "Trường THPT Trần Cao Vân",
        address: "777 Liên Chiểu",
        city: "Đà Nẵng",
        country: "Việt Nam",
      },
      {
        id: "16",
        name: "Trường THPT Lê Lợi",
        address: "888 Đông Hà",
        city: "Quảng Trị",
        country: "Việt Nam",
      },
      {
        id: "17",
        name: "Trường THPT Quảng Bình",
        address: "999 Đồng Hới",
        city: "Quảng Bình",
        country: "Việt Nam",
      },
      {
        id: "18",
        name: "Trường THPT Võ Nguyên Giáp",
        address: "1010 Nha Trang",
        city: "Khánh Hòa",
        country: "Việt Nam",
      },
      {
        id: "19",
        name: "Trường THPT Nguyễn Du",
        address: "1111 Bến Tre",
        city: "Bến Tre",
        country: "Việt Nam",
      },
      {
        id: "20",
        name: "Trường THPT Nguyễn Đình Chiểu",
        address: "1212 Mỹ Tho",
        city: "Tiền Giang",
        country: "Việt Nam",
      },
    ],
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
