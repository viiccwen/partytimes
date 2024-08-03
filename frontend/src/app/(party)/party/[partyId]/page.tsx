

export default function PartyPage({
    params
} : { params: { partyId: string } }) {
    return (
        <div>
            <h1>Party Page</h1>
            <p>Party ID: {params.partyId}</p>
        </div>
    );
}