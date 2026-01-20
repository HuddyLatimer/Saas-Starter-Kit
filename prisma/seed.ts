import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10)

    const user = await prisma.user.upsert({
        where: { email: 'demo@nexora.com' },
        update: {},
        create: {
            email: 'demo@nexora.com',
            name: 'Demo User',
            password: hashedPassword,
        },
    })

    // Create or connect organization
    // Since slug is unique, we check existence
    const existingOrg = await prisma.organization.findUnique({ where: { slug: 'nexora-corp' } })

    if (!existingOrg) {
        const org = await prisma.organization.create({
            data: {
                name: 'Nexora Corp',
                slug: 'nexora-corp',
                members: {
                    create: {
                        userId: user.id,
                        role: 'OWNER'
                    }
                }
            }
        })
        console.log({ user, org })
    } else {
        console.log({ user, message: "Org already exists" })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
