import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';


export async function POST(request: NextRequest) {
  console.log('readed route.ts file checkout session')
  const headersList = await headers();
  const origin = headersList.get('origin');

  // 1. Extract the form parameters securely from the incoming formData body
  const formData = await request.formData();
  console.log("form data", formData);
  // <input type="hidden" name="propertyId" value={propertyDetails._id || propertyDetails.id} />
  //                                           <input type="hidden" name="propertyTitle" value={propertyDetails.title} />
  //                                           <input type="hidden" name="propertyPrice" value={propertyDetails.price} />
  //                                           <input type="hidden" name="userName" value={(session as any)?.data?.user?.name} />
  //                                           <input type="hidden" name="userId" value={(session as any)?.data?.user?.id} />
  //                                           <input type="hidden" name="propertyOwner" value={propertyDetails.ownerInfo?.name} />
  //                                           <input type="hidden" name="propertyOwnerId" value={propertyDetails.ownerInfo?.id} />

  const propertyId = formData.get('propertyId') as string;
  const propertyTitle = formData.get('propertyTitle') as string;
  const propertyPrice = Number(formData.get('propertyPrice'));
  const userName = formData.get('userName') as string;
  const userId = formData.get('userId') as string;
  const propertyOwner = formData.get('propertyOwner') as string;
  const propertyOwnerId = formData.get('propertyOwnerId') as string;

  const moveInDate = formData.get('moveInDate') as string;
  const contactNumber = formData.get('contactNumber') as string;
  const notes = formData.get('notes') as string;

  // Validate we have the essentials
  if (!propertyId || !propertyPrice) {
    return NextResponse.json({ error: "Missing required property metrics" }, { status: 400 });
  }

  // Rent + $150 platform fee calculated in CENTS
  const totalAmountCents = (propertyPrice + 150) * 100;
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Booking for ${propertyTitle}`,
              description: 'First month rent + platform fee',
            },
            unit_amount: totalAmountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Pass variables into success redirect string to process database verification steps on return
      success_url: `${origin}/success/?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/properties/${propertyId}?status=cancelled`,

      // Save data inside metadata so it remains preserved when checking transaction logs
      metadata: {
        propertyId,
        moveInDate,
        contactNumber,
        notes,
        userName,
        userId,
        propertyOwner,
        propertyOwnerId,
        propertyPrice
      }
    });
    return NextResponse.redirect((session as any).url, 303)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}