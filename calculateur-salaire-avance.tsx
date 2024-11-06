"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type RepartitionMode = {
  name: string
  method: string
  values: [number, string][]
}

const repartitionModes: RepartitionMode[] = [
  {
    name: "Règle 50/30/20",
    method: "50/30/20",
    values: [
      [0.5, "Besoins essentiels"],
      [0.3, "Désirs personnels"],
      [0.2, "Épargne et remboursement des dettes"]
    ]
  },
  {
    name: "Méthode 80/20 (Pareto)",
    method: "80/20",
    values: [
      [0.8, "Dépenses courantes"],
      [0.2, "Épargne"]
    ]
  },
  {
    name: "Méthode 70/20/10",
    method: "70/20/10",
    values: [
      [0.7, "Dépenses courantes"],
      [0.2, "Épargne"],
      [0.1, "Dons ou investissements"]
    ]
  },
  {
    name: "Système à six comptes (Jars)",
    method: "Jars",
    values: [
      [0.55, "Nécessités financières"],
      [0.1, "Loisirs"],
      [0.1, "Épargne à long terme"],
      [0.1, "Éducation"],
      [0.05, "Dons"],
      [0.1, "Compte principal"]
    ]
  },
  {
    name: "Méthode zéro-based budgeting",
    method: "Zero-based",
    values: [
      [1, "Budget total à allouer"]
    ]
  },
  {
    name: "Règle 60% (Richard Jenkins)",
    method: "60% Rule",
    values: [
      [0.6, "Dépenses engagées"],
      [0.1, "Épargne retraite"],
      [0.1, "Épargne à long terme"],
      [0.1, "Épargne à court terme"],
      [0.1, "Loisirs"]
    ]
  },
  {
    name: "Méthode 100-10-10-10",
    method: "100-10-10-10",
    values: [
      [0.7, "Dépenses (après prélèvements)"],
      [0.1, "Épargne retraite"],
      [0.1, "Épargne d'urgence"],
      [0.1, "Investissements"]
    ]
  },
  {
    name: "Méthode des enveloppes",
    method: "Enveloppes",
    values: [
      [1, "À répartir manuellement"]
    ]
  }
]

export default function Component() {
  const [salaire, setSalaire] = useState<number | "">("")
  const [mode, setMode] = useState<RepartitionMode>(repartitionModes[0])
  const [result, setResult] = useState<[number, string][]>([])

  const handleCalcul = () => {
    if (typeof salaire === "number" && salaire > 0) {
      setResult(mode.values.map(([value, label]) => [salaire * value, label]))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Calculateur de Répartition de Salaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="salaire" className="text-sm font-medium">
            Salaire (en dh)
          </label>
          <Input
            id="salaire"
            type="number"
            placeholder="Entrez votre salaire"
            value={salaire}
            onChange={(e) => setSalaire(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="mode" className="text-sm font-medium">
            Méthode de gestion
          </label>
          <Select onValueChange={(value) => setMode(repartitionModes.find(m => m.method === value) || repartitionModes[0])}>
            <SelectTrigger id="mode">
              <SelectValue placeholder="Sélectionnez une méthode" />
            </SelectTrigger>
            <SelectContent>
              {repartitionModes.map((mode) => (
                <SelectItem key={mode.method} value={mode.method}>
                  {mode.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleCalcul} className="w-full">
          Calculer
        </Button>
        {result.length > 0 && (
          <div className="bg-primary/10 p-4 rounded-md space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Salaire total :</span>
              <span className="font-bold">{salaire.toFixed(2)} dh</span>
            </div>
            {result.map(([value, label], index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{label} :</span>
                <span className="font-semibold">{value.toFixed(2)} dh</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
