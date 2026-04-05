import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedData = [
  {
    month: '2025-10',
    year: 2025,
    month_num: 10,
    totalScore: 61.35,
    fundingScore: 62,
    jobPostingScore: 58,
    newsVolumeScore: 65,
    pollScore: 60,
    isPublished: true,
    publishedAt: new Date('2025-11-01'),
    commentary:
      'Tháng 10/2025 ghi nhận đà phục hồi ổn định của hệ sinh thái khởi nghiệp Việt Nam sau giai đoạn trầm lắng cuối quý 3. Hoạt động gọi vốn duy trì tích cực với một số thương vụ đáng chú ý trong lĩnh vực fintech và thương mại điện tử. Thị trường tuyển dụng công nghệ cải thiện nhẹ, phản ánh sự tự tin ngày càng tăng của các doanh nghiệp vào triển vọng tăng trưởng. Chỉ số tổng hợp đạt 61,35 điểm, cho thấy tâm lý thị trường đang chuyển sang trạng thái thận trọng lạc quan.',
    sectorScores: [
      { sector: 'fintech',    score: 65, trend: null },
      { sector: 'ecommerce',  score: 60, trend: null },
      { sector: 'edtech',     score: 55, trend: null },
      { sector: 'healthtech', score: 58, trend: null },
      { sector: 'deeptech',   score: 62, trend: null },
    ],
  },
  {
    month: '2025-11',
    year: 2025,
    month_num: 11,
    totalScore: 66.75,
    fundingScore: 68,
    jobPostingScore: 65,
    newsVolumeScore: 70,
    pollScore: 63,
    isPublished: true,
    publishedAt: new Date('2025-12-01'),
    commentary:
      'Tháng 11/2025 tiếp tục xu hướng tích cực với sự gia tăng rõ rệt về hoạt động gọi vốn, đặc biệt từ các quỹ đầu tư mạo hiểm trong và ngoài nước. Số lượng tin tuyển dụng kỹ thuật số tăng khoảng 12% so với tháng trước, phản ánh nhu cầu mở rộng thực sự. Tin tức và báo cáo về startup đạt mức cao nhất trong năm, cho thấy truyền thông ngày càng quan tâm đến hệ sinh thái. Chỉ số tổng hợp bứt phá lên 66,75 điểm — mức cao nhất kể từ quý 2/2025.',
    sectorScores: [
      { sector: 'fintech',    score: 70, trend: 5 },
      { sector: 'ecommerce',  score: 65, trend: 5 },
      { sector: 'edtech',     score: 60, trend: 5 },
      { sector: 'healthtech', score: 63, trend: 5 },
      { sector: 'deeptech',   score: 67, trend: 5 },
    ],
  },
  {
    month: '2025-12',
    year: 2025,
    month_num: 12,
    totalScore: 54.50,
    fundingScore: 55,
    jobPostingScore: 50,
    newsVolumeScore: 58,
    pollScore: 55,
    isPublished: true,
    publishedAt: new Date('2026-01-05'),
    commentary:
      'Tháng 12/2025 chứng kiến sự hạ nhiệt thường niên khi thị trường bước vào mùa nghỉ cuối năm. Hoạt động gọi vốn chậm lại đáng kể, các nhà đầu tư ưu tiên hoàn tất hồ sơ năm tài chính hơn là triển khai vốn mới. Tuyển dụng nhân sự công nghệ đóng băng tạm thời trong bối cảnh nhiều doanh nghiệp đang lên kế hoạch ngân sách cho 2026. Dù vậy, tinh thần cộng đồng khởi nghiệp vẫn lạc quan, hướng tới một năm mới với nhiều kỳ vọng.',
    sectorScores: [
      { sector: 'fintech',    score: 57, trend: -13 },
      { sector: 'ecommerce',  score: 60, trend: -5 },
      { sector: 'edtech',     score: 48, trend: -12 },
      { sector: 'healthtech', score: 52, trend: -11 },
      { sector: 'deeptech',   score: 54, trend: -13 },
    ],
  },
  {
    month: '2026-01',
    year: 2026,
    month_num: 1,
    totalScore: 72.25,
    fundingScore: 72,
    jobPostingScore: 70,
    newsVolumeScore: 75,
    pollScore: 72,
    isPublished: true,
    publishedAt: new Date('2026-02-03'),
    commentary:
      'Tháng 1/2026 mở đầu năm mới với làn sóng năng lượng mạnh mẽ trên toàn hệ sinh thái khởi nghiệp. Dòng vốn đầu tư quay trở lại tích cực với nhiều thương vụ Series A và B được công bố. Thị trường lao động công nghệ sôi động trở lại, nhu cầu tuyển dụng kỹ sư AI và dữ liệu tăng vọt. Cộng đồng khởi nghiệp đánh giá cao triển vọng năm mới, kéo chỉ số khảo sát lên mức 72 điểm. Đây là tháng có điểm tổng hợp cao nhất kể từ đầu năm 2025.',
    sectorScores: [
      { sector: 'fintech',    score: 74, trend: 17 },
      { sector: 'ecommerce',  score: 72, trend: 12 },
      { sector: 'edtech',     score: 66, trend: 18 },
      { sector: 'healthtech', score: 70, trend: 18 },
      { sector: 'deeptech',   score: 75, trend: 21 },
    ],
  },
  {
    month: '2026-02',
    year: 2026,
    month_num: 2,
    totalScore: 47.90,
    fundingScore: 48,
    jobPostingScore: 42,
    newsVolumeScore: 52,
    pollScore: 50,
    isPublished: true,
    publishedAt: new Date('2026-03-03'),
    commentary:
      'Tháng 2/2026 chịu tác động mạnh từ kỳ nghỉ Tết Nguyên Đán kéo dài, khiến hầu hết hoạt động kinh doanh và đầu tư tạm dừng trong gần hai tuần. Chỉ số tổng hợp giảm sâu xuống 47,90 điểm — mức thấp nhất trong giai đoạn quan sát — phản ánh đúng quy luật mùa vụ đặc thù của thị trường Việt Nam. Tuyển dụng gần như đóng băng, số lượng bài đăng tìm việc giảm xuống đáy. Đây là hiện tượng bình thường và dự báo sự bùng nổ mạnh mẽ trong tháng 3 sau kỳ nghỉ lễ.',
    sectorScores: [
      { sector: 'fintech',    score: 50, trend: -24 },
      { sector: 'ecommerce',  score: 55, trend: -17 },
      { sector: 'edtech',     score: 40, trend: -26 },
      { sector: 'healthtech', score: 45, trend: -25 },
      { sector: 'deeptech',   score: 48, trend: -27 },
    ],
  },
  {
    month: '2026-03',
    year: 2026,
    month_num: 3,
    totalScore: 74.00,
    fundingScore: 75,
    jobPostingScore: 72,
    newsVolumeScore: 78,
    pollScore: 70,
    isPublished: true,
    publishedAt: new Date('2026-04-02'),
    commentary:
      'Tháng 3/2026 chứng kiến sự bùng nổ mạnh mẽ sau kỳ nghỉ Tết, với chỉ số tổng hợp vọt lên 74,00 điểm — mức cao nhất trong toàn giai đoạn. Các quỹ đầu tư đẩy mạnh triển khai vốn khi nhiều thương vụ bị trì hoãn từ tháng 2 được chốt đồng loạt. Tin tuyển dụng công nghệ bùng nổ, đặc biệt trong mảng AI và deeptech. Truyền thông trong nước và quốc tế đưa tin tích cực về các startup Việt Nam, tạo nền tảng vững chắc cho quý 2/2026 đầy kỳ vọng.',
    sectorScores: [
      { sector: 'fintech',    score: 76, trend: 26 },
      { sector: 'ecommerce',  score: 72, trend: 17 },
      { sector: 'edtech',     score: 68, trend: 28 },
      { sector: 'healthtech', score: 73, trend: 28 },
      { sector: 'deeptech',   score: 80, trend: 32 },
    ],
  },
]

async function main() {
  console.log('Starting seed...')

  for (const { sectorScores, ...indexData } of seedData) {
    const index = await prisma.monthlyIndex.upsert({
      where: { month: indexData.month },
      update: indexData,
      create: indexData,
    })

    console.log(`Upserted MonthlyIndex: ${index.month} (id: ${index.id})`)

    for (const s of sectorScores) {
      await prisma.sectorScore.upsert({
        where: { indexId_sector: { indexId: index.id, sector: s.sector } },
        update: { score: s.score, trend: s.trend },
        create: { indexId: index.id, ...s },
      })
    }

    console.log(`  → Upserted ${sectorScores.length} sector scores`)
  }

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
